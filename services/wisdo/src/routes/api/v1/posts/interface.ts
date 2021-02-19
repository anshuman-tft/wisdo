export const POST_STATUS = {
    PENDING_APPROVAL: 'Pending approval',
    APPROVED: 'Approved'
};

export interface POST_PAYLOAD {
    title: string;
    image?: string;
    body: string;
    summary: string;
    status: string;
    communityId: string;
    authorId: string;
}

export interface GET_ALL_POSTS {
    userId: string
    communityId: string
    postStatus: string[]
}