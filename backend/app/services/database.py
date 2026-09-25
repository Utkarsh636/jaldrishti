import psycopg


DATABASE_URL = (
    "postgresql://jaldrishti:jaldrishti_dev"
    "@localhost:5432/jaldrishti"
)


def get_connection():
    return psycopg.connect(DATABASE_URL)