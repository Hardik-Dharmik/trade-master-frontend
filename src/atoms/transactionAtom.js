import { atom } from "recoil";

export const transactionAtom = atom({
    key: "transactionAtom",
    default: {
        isMsgAvailable: false,
        msg: "",
    }
})