// --- 10. SOFT DELETES (Base Model) ---
export class BaseModel {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null; // The Safety Net

    constructor() {
        this.id = 'gen_id_' + Date.now();
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = null;
    }

    delete() {
        // Soft Delete instead of Hard Delete
        this.deleted_at = new Date();
    }
}

// --- 9. FEATURE FLAGS ---
export const FEATURES = {
    USE_OLD_SCORING: 'use_old_scoring',
    BOG_REPORTING_V2: 'bog_reporting_v2',
    AUTO_LOAN_DISBURSEMENT: 'auto_loan_disbursement'
};

const ORG_FLAGS: Record<string, string[]> = {
    'org_gh_ecobank': [FEATURES.BOG_REPORTING_V2, FEATURES.AUTO_LOAN_DISBURSEMENT],
    'org_gh_small_mfi': [] // Basic Features only
};

export const hasFeature = (orgId: string, feature: string): boolean => {
    const flags = ORG_FLAGS[orgId] || [];
    return flags.includes(feature);
};
