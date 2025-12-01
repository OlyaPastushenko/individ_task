# Описание схемы базы данных: Трекер привычек

Для реализации функционала приложения используются **4 основные коллекции**. Этого достаточно для хранения данных о пользователях, их привычках, истории выполнения и достижениях.

---

## Коллекции и типы данных

### 1. User (Пользователь)
Хранение учетных данных пользователя.

**Поля:**
- `id` — уникальный идентификатор  
- `email` — электронная почта (уникальная)  
- `password` — хэшированный пароль  
- `name` — имя пользователя  
- `createdAt` — дата регистрации  

---

### 2. Habit (Привычка)
Хранение информации о привычках пользователя.

**Поля:**
- `id` — уникальный идентификатор  
- `title` — название привычки  
- `description` — описание (опционально)  
- `color` — цвет для интерфейса  
- `targetDays` — целевое количество дней  
- `schedule` — расписание (например: daily, Mon/Wed/Fri)  
- `userId` — владелец привычки  

---

### 3. HabitLog (Журнал выполнения)
Фиксация выполнения привычек по дням.

**Поля:**
- `id` — уникальный идентификатор  
- `date` — дата выполнения  
- `status` — состояние выполнения  
- `mood` — настроение (опционально)  
- `note` — заметка (опционально)  
- `habitId` — связанная привычка  

---

### 4. Achievement (Достижение)
Хранение достижений пользователя.

**Поля:**
- `id` — уникальный идентификатор  
- `name` — название  
- `description` — условие получения  
- `icon` — иконка  
- `earnedAt` — дата получения  
- `userId` — владелец достижения  

---

### 5. Тип данных: Statuses
Перечисление возможных статусов выполнения:

- `Completed` — выполнено  
- `Missed` — пропущено  
- `NotCompleted` — не выполнено  

---

## CRUD-операции

### user.ts
- `createUser(email, password, name)`
- `getUserById(id)`
- `getUserByEmail(email)`
- `updateUserName(id, newName)`
- `deleteUser(id)`

### habit.ts
- `createHabit(title, description, color, targetDays, schedule, userId)`
- `getHabitById(id)`
- `getUserHabits(userId)`
- `updateHabitTitle(id, newTitle)`
- `updateHabitDescription(id, newDescription)`
- `deleteHabit(id)`

### habitLog.ts
- `createHabitLog(status, mood, note, habitId)`
- `updateHabitLogStatus(id, newStatus)`
- `updateHabitLogNote(id, newNote)`
- `updateHabitLogMood(id, newMood)`
- `deleteHabitLog(id)`

### achievement.ts
- `createAchievement(name, description, icon, userId)`
- `getUserAchievements(userId)`
- `deleteAchievement(id)`

---

## Бизнес-логика

1. **Отметка выполнения привычки**  
   Создание или обновление записи в `HabitLog` для выбранной даты.

2. **Список привычек на сегодня**  
   Фильтрация привычек по пользователю и расписанию + проверка журнала.

3. **Расчёт серии выполнения (streak)**  
   Анализ последних записей до первого пропуска.

4. **Статистика прогресса**  
   Подсчёт выполненных дней и процент успешности.
