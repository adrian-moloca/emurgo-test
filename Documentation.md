# API Documentation for `tech-test`

## Base URL

```
/api/articles
```

## Endpoints

### 1. `GET /api/articles/search`

This endpoint is used to search for articles based on query parameters.

#### Request

- **Method**: `GET`
- **URL**: `/api/articles/search`
- **Query Parameters**:
  - `q` (string, required): The search term for the articles.
  - `max` (string, optional): The maximum number of results to return.
  - `lang` (string, optional): The language of the articles (e.g., `en`, `fr`).
  - `country` (string, optional): The country to filter articles (e.g., `us`, `gb`).
  - `in` (string, optional): A specific field to search within (e.g., `title`, `description`).
  - `nullable` (string, optional): A nullable field for specific cases (use for custom filtering).
  - `from` (string, required): The start date in ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`).
  - `to` (string, optional): The end date in ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`).
  - `sortby` (string, optional): How to sort the results. Options include `relevancy`, `popularity`, or `publishedAt`.

#### Example Request - on localhost with port 5050

`GET http://127.0.0.1:5050/api/articles/search?q=technology&from=2024-09-10T00:00:00Z&to=2024-09-12T00:00:00Z&lang=en&country=us&max=10`


---

### 2. `GET /api/articles/headlines`

This endpoint is used to retrieve the top headlines based on query parameters.

#### Request

- **Method**: `GET`
- **URL**: `/api/articles/headlines`
- **Query Parameters**:
  - `q` (string, optional): The search term for headlines.
  - `category` (string, optional): The category of news. Available options include:
    - `'general'`
    - `'world'`
    - `'nation'`
    - `'business'`
    - `'technology'`
    - `'entertainment'`
    - `'sports'`
    - `'science'`
    - `'health'`
  - `max` (string, optional): The maximum number of results to return.
  - `lang` (string, optional): The language of the articles (e.g., `en`, `fr`).
  - `country` (string, optional): The country to filter articles (e.g., `us`, `gb`).
  - `in` (string, optional): A specific field to search within (e.g., `title`, `description`).
  - `nullable` (string, optional): A nullable field for specific cases (use for custom filtering).
  - `from` (string, optional): The start date in ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`).
  - `to` (string, optional): The end date in ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`).
  - `sortby` (string, optional): How to sort the results. Options include `relevancy` or `publishedAt`.

#### Example Request - on localhost with port 5050

`GET http://127.0.0.1:5050/api/articles/headlines?category=technology&country=us&max=10&lang=en`
