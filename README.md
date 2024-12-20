# Simplify Storage

`Simplify Storage` is a JavaScript library for easily managing different types of web storage. It provides a unified interface to work with `localStorage`, `sessionStorage`, and `cookieStorage` with added features such as serialization and deserialization of data.

## Features

- Supports **localStorage**, **sessionStorage**, and **cookieStorage**.
- Automatic serialization and deserialization of arrays and objects.
- Easy-to-use API for storing, retrieving, and removing data.
- Supports querying and clearing the storage.

## Installation

You can install `simplify-storage` using npm:

```bash
npm install simplify-storage
Or you can add it to your project directly via a <script> tag in the HTML:

html

<script src="path-to-your-library/script.js"></script>
API
setInStorage(key, data, type = "local")
Stores data in the specified storage type (localStorage, sessionStorage, or cookieStorage).

Parameters

key: The key under which the data will be stored.
data: The data to be stored. Can be a string, number, boolean, array, or object.
type: The type of storage to use. Defaults to localStorage.
Example

javascript

setInStorage("username", "JohnDoe", "local");
getFromStorage(key, type)
Retrieves the data stored under the specified key from the specified storage type.

Parameters

key: The key of the data to retrieve.
type: The type of storage to use. Defaults to localStorage.
Returns: The stored data, or null if the key does not exist.

Example

javascript

const username = getFromStorage("username", "local");
console.log(username); // Outputs: "JohnDoe"
removeFromStorage(key, type = "local")
Removes the data stored under the specified key from the specified storage type.

Parameters

key: The key of the data to remove.
type: The type of storage to use. Defaults to localStorage.
Example

javascript

removeFromStorage("username", "local");
clearStorage(type = "local")
Clears all data from the specified storage type.

Parameters

type: The type of storage to clear. Defaults to localStorage.
Example

javascript

clearStorage("local");
getAllStorageItems(type = "local")
Returns all items stored in the specified storage type.

Parameters

type: The type of storage to query. Defaults to localStorage.
Returns: An array of objects, each containing a key and value.

Example

javascript

const items = getAllStorageItems("local");
console.log(items); // Outputs an array of stored items
hasItemInStorage(key, type = "local")
Checks if a specific key exists in the specified storage type.

Parameters

key: The key to check.
type: The type of storage to check. Defaults to localStorage.
Returns: true if the key exists, false otherwise.

Example

javascript

const hasUsername = hasItemInStorage("username", "local");
console.log(hasUsername); // Outputs: true or false
CookieStorage
CookieStorage is a class that mimics the behavior of localStorage and sessionStorage, but stores data in cookies. It provides the same methods: setItem, getItem, removeItem, clear, key, and getAllItems.

Example
javascript

const cookieStorage = new CookieStorage();
cookieStorage.setItem("user", "JaneDoe");
console.log(cookieStorage.getItem("user")); // Outputs: "JaneDoe"
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
If you have any ideas or improvements for this library, feel free to fork it and create a pull request. Contributions are always welcome!

Contact
For any issues or suggestions, please open an issue or contact ITSawa.


### Explanation:
- The `README.md` explains the key features and functionality of the `simplify-storage` library.
- The **API** section outlines how to use the library, with examples for storing, retrieving, and managing data in different storage types.
- The `CookieStorage` class and its methods are described in detail, showcasing how it can be used as an alternative to other storage types.
- The **Installation** and **License** sections provide basic setup instructions and licensing information.

```
