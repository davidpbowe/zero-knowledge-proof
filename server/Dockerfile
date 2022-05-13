FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY . /app

WORKDIR /app
RUN pip install -r requirements.txt

RUN adduser -u 5678 --disabled-password --gecos "" nillion && chown -R nillion /app
USER nillion

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]