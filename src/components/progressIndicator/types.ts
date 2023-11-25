export enum ProgressStepStatus {
    Pending = 'pending',
    Active = 'active',
    Successful = 'successful',
    Error = 'error',
}

export interface IProgressIndicatorProps {
    steps: ProgressStepStatus[];
}
