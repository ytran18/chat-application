import { atom, useAtom } from "jotai";

import { Inbox, inbox } from "./data";

type Config = {
    selected: Inbox["id"] | null
};

const configAtom = atom<Config>({
    selected: inbox[0].id,
});

export function useMail() {
    return useAtom(configAtom)
};
