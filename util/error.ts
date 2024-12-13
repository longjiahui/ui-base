export class DefaultError extends Error {
  messages: any[]
  constructor(...messages: any[]) {
    super(
      messages
        .map((m) => {
          try {
            return typeof m === "string" ? m : JSON.stringify(m)
          } catch (err) {
            console.warn(err)
            return "[unknown]"
          }
        })
        .join(" "),
    )
    this.messages = messages
    this.name = "DefaultError"
  }
}

export class ValidateError extends DefaultError {
  constructor(...rest: any[]) {
    super(...rest)
    this.name = "ValidateError"
  }
}

export class ServiceError extends DefaultError {
  constructor(...rest: any[]) {
    super(...rest)
    this.name = "ServiceError"
  }
}

export class UnExpectedError extends DefaultError {
  constructor(...rest: any[]) {
    super(...rest)
    this.name = "UnExpectedError"
  }
}

export class AxiosError extends DefaultError {
  constructor(...rest: any[]) {
    super(...rest)
    this.name = "AxiosError"
  }
}
