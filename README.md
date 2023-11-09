HCM (Human Capital Management), a platform that could be helpful to small and medium businesses with their HR tasks. The application lets the organization set their specific needs for departments and working positions and complete the day-to-day tasks (create, read, update, and delete users) of an HR employee. The application has three different types of users (Employee, HR, and Admin).

Employees can view their personal team and the people from their department. They can also update some of their personal information (personal representing photo, phone number, email, and password), employees can also request a paid leave.
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/86753db4-28f7-4f28-976f-0053ffb4dbab)

HRs have the same functionality (update personal information and request a paid leave) as an employee. They can see their team and department as well; however, the cards representing these users are now clickable and would navigate the user to a page where all the information for the specific user can be seen and updated or the user be deleted. HRs have access to the Search Page where they can see all the users in the application except the Admins, sort them, and search by (Name, Direct Manager, Positions, Department, and Salary). There is a button that navigates to the page representing the specific user and holds the update and delete functionality. HRs have access to a page for creating a new user; there, the HR can create a new user (employee or HR). The HR can also add country of residence, nationality, currency, position, and department if the form is not providing all the needed information for creating the new user. HRs have access to the Dashboard page where they can see all the leave requests that have not been handled yet and accept/reject them.

Admins have the same functionality as an HR; however, they can reset the password for a specific user from the page representing the specific user information. They can also create new admins. They do not have a team or department and are not able to request a paid leave.

The whole idea of the application is to be given to a small to medium organization with one preset Admin profile, and from there, the organization would be able to set everything for their needs (positions, departments, currencies for salaries, countries of residence for their employees, and nationalities) and create the profiles for all the employees of the company. The hierarchy supports employees and managers, which means that the managers do not have another manager or VP above them.

Used technologies:
Angular 16
Angular Material
NgRX
RxJS
SCSS

The application is preset with positions, departments, countries, nationalities, and currencies, as well as 15 users and 11 leave requests:
positions: manager, senior, mid, junior
departments: HR, IT, Accounting
users:
1 Admin
4 HRs (one manager and three employees under that manager)
10 employees (two managers and eight employees under those two managers)

Credentials:
Admin account: email: Admin@123456, password: Admin@123456 
HR Manager account: email: HRmanager@123456 password: HRmanager@123456 
employee: email: employee@abv.com password: employee@abv.com."
