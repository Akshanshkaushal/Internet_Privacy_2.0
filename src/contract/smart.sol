// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PhotoStorage is ERC721, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Photo {
        string ipfsHash;
        uint256 timestamp;
        bool isPrivate;
    }

    mapping(address => Photo[]) private userPhotos;
    mapping(uint256 => address[]) private sharedWith;

    event PhotoUploaded(
        address indexed owner,
        uint256 tokenId,
        string ipfsHash,
        uint256 timestamp,
        bool isPrivate
    );
    event ContractPaused(address account);
    event ContractUnpaused(address account);
    event PhotoShared(uint256 tokenId, address indexed recipient);

    modifier onlyPhotoOwner(uint256 _tokenId) {
        require(_exists(_tokenId), "Token ID does not exist");
        require(
            ownerOf(_tokenId) == msg.sender,
            "You are not the owner of this photo"
        );
        _;
    }

    constructor() ERC721("PhotoStorageToken", "PST") {}

    function uploadPhoto(
        string memory _ipfsHash,
        bool _isPrivate
    ) external whenNotPaused {
        require(bytes(_ipfsHash).length > 0, "IPFS hash must not be empty");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);
        _tokenIdCounter.increment();

        userPhotos[msg.sender].push(
            Photo(_ipfsHash, block.timestamp, _isPrivate)
        );

        emit PhotoUploaded(
            msg.sender,
            tokenId,
            _ipfsHash,
            block.timestamp,
            _isPrivate
        );
    }

    function getTotalPhotos() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getUserPhotos() external view returns (Photo[] memory) {
        return userPhotos[msg.sender];
    }

    function deletePhoto(
        uint256 _tokenId
    ) external whenNotPaused onlyPhotoOwner(_tokenId) {
        _burn(_tokenId);
        removePhotoFromUser(_tokenId);
    }

    function sharePhoto(
        uint256 _tokenId,
        address _recipient
    ) external whenNotPaused onlyPhotoOwner(_tokenId) {
        require(
            _recipient != address(0) && _recipient != msg.sender,
            "Invalid recipient address"
        );

        sharedWith[_tokenId].push(_recipient);
        emit PhotoShared(_tokenId, _recipient);
    }

    function getSharedAddresses(
        uint256 _tokenId
    ) external view returns (address[] memory) {
        return sharedWith[_tokenId];
    }

    function togglePrivacy(
        uint256 _tokenId
    ) external whenNotPaused onlyPhotoOwner(_tokenId) {
        Photo storage photo = userPhotos[msg.sender][
            _findPhotoIndex(msg.sender, _tokenId)
        ];
        photo.isPrivate = !photo.isPrivate;
    }

    function isPhotoPrivate(uint256 _tokenId) external view returns (bool) {
        return
            userPhotos[msg.sender][_findPhotoIndex(msg.sender, _tokenId)]
                .isPrivate;
    }

    // New: Function to get the IPFS hash of a photo
    function getPhotoIPFSHash(
        uint256 _tokenId
    ) external view returns (string memory) {
        require(_exists(_tokenId), "Token ID does not exist");
        require(
            !userPhotos[msg.sender][_findPhotoIndex(msg.sender, _tokenId)]
                .isPrivate || ownerOf(_tokenId) == msg.sender,
            "Photo is private"
        );

        return
            userPhotos[msg.sender][_findPhotoIndex(msg.sender, _tokenId)]
                .ipfsHash;
    }

    function removePhotoFromUser(uint256 _tokenId) internal {
        uint256 indexToDelete = _findPhotoIndex(msg.sender, _tokenId);
        if (indexToDelete < userPhotos[msg.sender].length - 1) {
            userPhotos[msg.sender][indexToDelete] = userPhotos[msg.sender][
                userPhotos[msg.sender].length - 1
            ];
        }
        userPhotos[msg.sender].pop();
    }

    function _findPhotoIndex(
        address _user,
        uint256 _tokenId
    ) internal view returns (uint256) {
        Photo[] storage photos = userPhotos[_user];
        for (uint256 i = 0; i < photos.length; i++) {
            if (_tokenId == tokenIdOfPhoto(photos[i])) {
                return i;
            }
        }
        revert("Photo not found");
    }

    function tokenIdOfPhoto(
        Photo memory _photo
    ) internal pure returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(_photo.ipfsHash, _photo.timestamp))
            );
    }
}
