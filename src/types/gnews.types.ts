export type SearchQueryParans = {
    q: string;
    max: string;
    lang: string;
    country: string;
    in: string;
    nullable: string;
    from: string;
    to: string;
    sortby: string;
};

export type TopHeadlinesQueryParans = {
    q: string;
    category:
        | 'general'
        | 'world'
        | 'nation'
        | 'business'
        | 'technology'
        | 'entertainment'
        | 'sports'
        | 'science'
        | 'health';
    max: string;
    lang: string;
    country: string;
    in: string;
    nullable: string;
    from: string;
    to: string;
    sortby: string;
};

type Article = {
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    source: {
        name: string;
        url: string;
    };
};

export type SearchResponseData = {
    articles: Article[];
};
