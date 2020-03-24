interface Submission {
    form_id: string;
    form_version: number;
    submitted_by: string;
    submitted_at: string;
    data: object;
    id: string;
}

declare namespace Beekeeper {
    interface FormSubmittedNotification {
        payload: FormSubmittedPayload;
        notification_id: string;
        event_type: string;
        tenant_fqdn: string;
        webhook_id: string;
    }

    interface FormSubmittedPayload {
        form_id: string;
        form_version: number;
        data: object;
        submitted_at: string;
        submitted_by: string;
        id: string;
        type: 'submission';
        
    }
}