FROM golang:1.23.1

WORKDIR /app

COPY . .

RUN go mod download

RUN GOOS=linux go build -o main

EXPOSE 5000

CMD [ "./main" ]