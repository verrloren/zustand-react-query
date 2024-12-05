export type Task = {
	id: string;
	title: string;
	description?: string;
	status: Status;
}

export type Status = "TODO" | "IN_PROGRESS" | "DONE";