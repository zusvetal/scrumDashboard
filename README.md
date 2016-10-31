# scrumDashboard

1.Team
  1.1 Add team:
+    1.1.1 Add team form.
+    1.1.2 Edit status field form. Choose status field for team ("Backlog" and "Done" are added automatically).
+  1.2 Team list with link
   1.3 Team settings:
-      1.3.1 Edit Team (team/settings).
      1.3.2 Edit status field form.
+        1.3.2.1 Add new Field
+        1.3.2.2 Delete ("Backlog" and "Done" are added automatically are not removable,  field must have no cards)
+        1.3.2.3 Edit
+      1.3.3 Delete team.
  1.4 Team members:
+      1.4.1 Add
+      1.4.2 Edit
+      1.4.3 Delete

2. Status fields
+  2.1 Drag and drop over fields.
-  2.2 Priority in fields.
+  2.3 Add task to "Backlog" field.
  2.4 Action after Drag and Drop:
+    2.4.1 After moving from "Backlog" assign task to user of team.
+    2.4.2 Block moving to "BackLog".
     2.4.3 "Done" field not draggable (Or not drag from "Done").   
+  2.5 Implement status field order.
+  2.6 Optimize of space under number of status fields.
    
3. Cards
  3.1 Implement different template for card:
     3.1.1 Card-regular:
-          3.1.1.1 Asign to another user. 
     3.1.2 Card-list:
+          3.1.2.1 Delete card
  3.2

+ 4. Authorization
+    4.1 Login form
+    4.2 Token auth