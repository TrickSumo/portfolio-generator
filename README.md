# portfolio-generator
Portfolio generator using REACT, AUTH0 and AWS S3, CloudFront, Lambda, DynamoDB


# LOCAL SETUP



1. Create 3 AWS Lambda Functions with following Permissios (Content of functions is in AWS Lambda folder):- 

* cloudFront_cache_invalidator --> CreateInvalidation For CloudFront
* porfolio_destroyer ----> S3 Full Write Access
* portfolio_creator  ----> S3 Full Write Access


2. Update lamda function URL settings for all 3:-
```
Function URL Config=>

* Auth Tyep: NONE
* Confiure CORS: Enable
* Allow origin: *
* Expose Headers: access-control-allow-origin
* Allow headers: content-type
* Allowed Methods: GET, POST
```
3. Update function URLs in .env file. Also get AUTH0 credentails and update it in .env file.

- For AUTH0 setup, please refer:- https://www.youtube.com/watch?v=pAzqscDx580

4. Create S3 bucket and use OAI + Cloudfront to make it publicaly available. Also update bucket name and cloudfront distribution id in lambda functions

5. Add below CORS policy in s3 bucket (Bucket >> Permissions >> Cross-origin resource sharing (CORS)):-

[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]

6. Create DynamoDB table with "email_hash" as partition key. Update database name in creator and destroyer functions.

7. Install REACT dependecies and run

``` 
npm i
npm start 
```



