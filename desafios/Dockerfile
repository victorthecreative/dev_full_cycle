FROM golang:1.22-alpine as builder

WORKDIR /go/src/app

COPY . .
RUN  go build -o /app main.go


FROM scratch

COPY --from=builder /app /app

CMD ["/app"]
