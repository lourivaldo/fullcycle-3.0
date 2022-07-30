export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  private errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }
  
  hasErrors() {
    return this.errors.length > 0
  }

  getErrors() {
    return this.errors
  }

  messages(context?: string): string {
    let messages = ''
    const errors = context ? 
      this.errors
        .filter((error) => context ? error.context === context : true) : this.errors
     messages = errors
       .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
    return messages
  }
}
