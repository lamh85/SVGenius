class Response {
  constructor({status, message}) {
    this.status = status
    this.message = message
  }
}

export class ResponseSuccess extends Response {
  constructor({message}) {
    super({status: 'success', message})
  }
}

export class ResponseFailed extends Response {
  constructor({message}) {
    super({status: 'failed', message})
  }
}