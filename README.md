HCM (Human Capital Management), a platform that could be helpful to small and medium businesses with their HR tasks. The application lets the organization set their specific needs for departments and working positions and complete the day-to-day tasks (create, read, update, and delete users) of an HR employee. The application has three different types of users (Employee, HR, and Admin).

Employees can view their personal team and the people from their department. They can also update some of their personal information (personal representing photo, phone number, email, and password), employees can also request a paid leave.
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/1e047e62-8e89-4b78-98bf-bccaf8573f11)
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/9b6229e0-b0d2-44df-bf40-dcfa5d4e267a)

HRs have the same functionality (update personal information and request a paid leave) as an employee. They can see their team and department as well; however, the cards representing these users are now clickable and would navigate the user to a page where all the information for the specific user can be seen and updated or the user be deleted. 
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/8a14abb9-65cf-475f-bbdf-20a3b02820fb)
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/a929d06e-f4e9-4d0f-a90c-595eb7a7fcb9)

HRs have access to the Search Page where they can see all the users in the application except the Admins, sort them, and search by (Name, Direct Manager, Positions, Department, and Salary). There is a button that navigates to the page representing the specific user and holds the update and delete functionality(the above image).
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/39958dcb-4c48-4ddb-9248-693ec14b02c4)
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/9bac6c97-1b48-4693-9e0b-64a1429e8197)

HRs have access to a page for creating a new user; there, the HR can create a new user (employee or HR). The HR can also add country of residence, nationality, currency, position, and department if the form is not providing all the needed information for creating the new user. 
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/9c9143b8-e0a2-47ef-9de6-c7795681b9d4)

HRs have access to the Dashboard page where they can see all the leave requests that have not been handled yet and accept/reject them.
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/5779df62-15c9-463c-ad70-ed86e266f917)
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/e11e3c60-eff0-4c4e-8cd7-f1fef160dfea)

Admins have the same functionality as an HR; however, they can reset the password for a specific user from the page representing the specific user information. They can also create new admins. They do not have a team or department and are not able to request a paid leave.
![image](https://github.com/mkasabov98/immedis_front_end_internship_2023_hcm_martin_kasabov/assets/128593836/c9ac8a17-04c7-4551-ba25-aa3fbc1517e5)

The idea of the application is to be given to a small or medium organization with one preset Admin profile, and from there, the organization would be able to set everything for their needs (positions, departments, currencies for salaries, countries of residence for their employees, and nationalities) and create the profiles for all the employees of the company. The hierarchy supports employees and managers, which means that the managers do not have another manager or VP above them.

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
