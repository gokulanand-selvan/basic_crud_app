import styles from "./style.module.css";
import dummyData from "../../utils/MOCK_DATA.json";
import { RiDeleteBin6Fill, RiEditBoxFill } from "react-icons/ri";
import { ChangeEvent, useState } from "react";
import EditDetials from "../../layouts/editDetials/EditDetials";
import { Dialog, Tooltip } from "@radix-ui/themes";
import Add from "../../layouts/Add/Add";

export default function EmployeeTable() {
  const [mockData, setMockdata] = useState(dummyData);
  const [init, setinit] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [EmployeeData, setEmployeeData] = useState<any>({});
  const [isAddOpen, setisAddOpen] = useState(false);

  const changehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setinit(e.target.value);
  };

  function deleteTable(id: number) {
    let result = mockData.filter((remove) => {
      return remove.id !== id;
    });
    setMockdata(result);
  }

  function getDataToEdit(data: any) {
    setEmployeeData(data);
  }

  const editedHandler = (
    id: number,
    fromChild: { first_name: string; last_name: string; city: string }
  ) => {
    let res = mockData.map((mock) => {
      if (mock.id === id) {
        return {
          ...mock,
          first_name: fromChild.first_name,
          last_name: fromChild.last_name,
          city: fromChild.city,
        };
      }
      return mock;
    });
    setMockdata(res);
  };

  function getNewData(newData: any) {
    setMockdata((prev) => {
      return [...prev, newData];
    });
  }

  return (
    <>
      <div className={styles.navbar}>
        <h2>Employee Management</h2>
        <div>
          <b>Search:</b>
          <input
            type="text"
            value={init}
            onChange={changehandler}
            placeholder="Enter keywords"
          />
        </div>
        <button
          style={{ background: "black", color: "white" }}
          onClick={() => setisAddOpen(true)}
        >
          Add
        </button>
      </div>
      <div className={styles.tabelConatiner}>
        <table>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>First Name</th>
              <th className={styles.th}>Last Name</th>
              <th className={styles.th}>City</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          {mockData
            .filter(
              (item) =>
                item?.first_name
                  .toLocaleLowerCase()
                  .includes(init.toLocaleLowerCase()) ||
                item?.city
                  .toLocaleLowerCase()
                  .includes(init.toLocaleLowerCase()) ||
                item?.last_name
                  .toLocaleLowerCase()
                  .includes(init.toLocaleLowerCase()) ||
                item?.id
                  .toString()
                  .toLocaleLowerCase()
                  .includes(init.toLocaleLowerCase())
            )
            .map((data) => (
              <tbody key={data.id}>
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.city}</td>
                  <td>
                    <div style={{ display: "flex", gap: "2rem" }}>
                      <RiDeleteBin6Fill
                        onClick={() => {
                          deleteTable(data.id);
                        }}
                        style={{
                          color: "red",
                          fontSize: "1.5rem",
                          cursor: "pointer",
                        }}
                      />
                      <RiEditBoxFill
                        onClick={() => {
                          setisOpen(true);
                          // setEmployeeData(data);
                          getDataToEdit(data);
                        }}
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      {EmployeeData.first_name ? (
        <EditDetials
          isOpen={isOpen}
          setIsopen={setisOpen}
          EmployeeData={EmployeeData}
          setEmployeeData={setEmployeeData}
          editedHandler={editedHandler}
        />
      ) : null}
      <Add
        setisAddOpen={setisAddOpen}
        isAddOpen={isAddOpen}
        mockId={mockData.length}
        getNewData={getNewData}
      />
    </>
  );
}
