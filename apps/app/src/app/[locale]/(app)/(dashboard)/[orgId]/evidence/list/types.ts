import type { Evidence } from "@bubba/db/types";

export type EvidenceTaskRow = Evidence & {
  assignee?: {
    id: string;
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
    };
  } | null;
};
