<?php

$count = $_GET['count'] ?? random_int(10, 100);

if (!is_numeric($count)) {
  http_response_code(400);

  exit;
}

$count = intval($count);

require_once './models/user.php';

$users = [];

for ($i = 0; $i < $count; $i++) {
  $firstNames = ['John', 'Micheal', 'Andrew', 'Tom'];
  $lastNames = ['Smith', 'Doe', 'Jones', 'Miller'];

  $hasName = random_int(0, 4) > 0; // 80% chance

  $users[] = new User(
    id: $i,
    name: $hasName
      ? implode(
          ' ',
          [
            $firstNames[array_rand($firstNames)],
            $lastNames[array_rand($lastNames)],
          ],
        )
      : null,
  );
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode(array_map(fn(User $user) => $user->__serialize(), $users));
