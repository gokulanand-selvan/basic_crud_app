import { Dialog } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { useState } from "react";

export default function Add({
  isAddOpen,
  setisAddOpen,
  mockId,
  getNewData,
}: {
  isAddOpen: boolean;
  setisAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mockId: number;
  getNewData: any;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  function CollectNewAddData(e: any) {
    e.preventDefault();
    let res = {
      id: mockId + 1,
      first_name: firstName,
      last_name: lastName,
      city: city,
    };
    getNewData(res);
    setisAddOpen(false);
    resetState();
  }
  const resetState = () => {
    setFirstName("");
    setLastName("");
    setCity("");
  };

  return (
    <div>
      <Dialog.Root open={isAddOpen} onOpenChange={setisAddOpen}>
        <Dialog.Trigger></Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Add an Employee</Dialog.Title>
          <form onSubmit={CollectNewAddData}>
            <div className={styles.dialogInput}>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.dialogInput}>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.dialogInput}>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={styles.btn_container}>
              <Dialog.Close>
                <button onClick={resetState} className={styles.cancel_btn}>
                  Cancel
                </button>
              </Dialog.Close>
              <button className={styles.action_btn} type="submit">
                Add
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
