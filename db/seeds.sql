INSERT INTO department (name)
VALUES ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Manufacturing");


INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 100000.00, 1),
    ("Stock Broker", 200000.00, 2),
    ("Patent Lawyer", 300000.00, 3),
    ("Machinist", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Davy", "Jones", 2, 5),
    ("Johnny", "Appleseed", 4, 5),
    ("Count", "Dracula", 3, 5),
    ("Nikola", "Tesla", 1, 5),
    ("Bill",  "Gates", 4, NULL)
