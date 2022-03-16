import React from "react";

export function mutedSmall(text: number | string | JSX.Element) {
    return <small className="text-muted">{text}</small>;
}

export function MutedSmall({ children }: { children: React.ReactNode }) {
    return <small className="text-muted">{children}</small>;
}
