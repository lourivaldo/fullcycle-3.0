
type CategoryProperties = {
  name: string
  description?: string
  isActive?: boolean
  createdAt?: Date
}

export class Category {
  constructor(
    public readonly props: CategoryProperties
  ) {
    this.description = this.props.description
    this.isActive = this.props.isActive
    this.props.createdAt = this.props.createdAt || new Date()
   }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get isActive() {
    return this.props.isActive
  }

  get createdAt() {
    return this.props.createdAt
  }

  private set description(value: string) {
    this.props.description = value ?? null
  }

  private set isActive(value: boolean) {
    this.props.isActive = value ?? true
  }
}
