import { Dialog } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { useState } from "react";
export default function EditDetials({
  isOpen,
  setIsopen,
  EmployeeData,
  setEmployeeData,
  editedHandler,
}: {
  isOpen: boolean;
  setIsopen: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployeeData: any;
  editedHandler: any;

  EmployeeData: {
    id: number;
    first_name: string;
    last_name: string;
    city: string;
  };
}) {
  const [firstName, setFirstName] = useState(EmployeeData.first_name);
  const [lastName, setLastName] = useState(EmployeeData.last_name);
  const [city, setCity] = useState(EmployeeData.city);

  // if (isOpen === false) {
  //   setEmployeeData({});
  // }
  const employeeId = EmployeeData.id;

  function saveChanges(e: any) {
    e.preventDefault();
    const editedResult = {
      first_name: firstName,
      last_name: lastName,
      city: city,
    };
    editedHandler(employeeId, editedResult);
    setIsopen(false);
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsopen}>
        <Dialog.Content className={styles.container}>
          <Dialog.Title>Edit Employee Detials</Dialog.Title>
          <form
            onSubmit={saveChanges}
            className={`${styles.flex_col} ${styles.form_container}`}
          >
            <div className={`${styles.form_input} ${styles.flex_col}`}>
              <label>Id:</label>
              <input type="text" value={employeeId} readOnly />
            </div>
            <div className={`${styles.form_input} ${styles.flex_col}`}>
              <label>Edit FirstName:</label>
              <input
                type="text"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className={`${styles.form_input} ${styles.flex_col}`}>
              <label>Edit LastName:</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className={`${styles.form_input} ${styles.flex_col}`}>
              <label>Edit City:</label>
              <input
                type="text"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div className={styles.btn_container}>
              <Dialog.Close>
                <button
                  className={styles.cancel_btn}
                  onClick={() => setEmployeeData({})}
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button type="submit" className={styles.action_btn}>
                Edit
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
