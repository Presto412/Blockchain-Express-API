# API Documentation

**Create**
----
  _Creates the blockchain array model_

* **URL**

  _/create_

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
      message: String,
    }
    ````

**Add Block**
----
  _Adds a block to the chain_

* **URL**

  _/addblock_

* **Method:**

  `POST`
* **Params**
    `data` : [Object]
* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
              message: String,
              result: Object
    }
    ````

**Verify Chain**
----
  _Verifies the hashing of the blocks_

* **URL**

  _/verifychain_

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
      success: Boolean,
      message: String
    }
    ````

**Empty Database**
----
  _Empties the database_

* **URL**

  _/emptydb_

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
      success: Boolean,
    }
    ````
