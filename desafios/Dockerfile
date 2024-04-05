FROM golang:1.22 as config

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod  ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/app ./...
RUN go build -ldflags '-s -w' main.go
CMD ["app"]

FROM golang:1.22-alpine as config2

WORKDIR /usr/src/app

COPY --from=config /usr/src/app .

FROM scratch
WORKDIR /app
COPY --from=config2 /usr/src/app .
