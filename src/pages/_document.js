import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="RC model store" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Raleway:wght@400;700&display=swap" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossOrigin="anonymous" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}

export default Document