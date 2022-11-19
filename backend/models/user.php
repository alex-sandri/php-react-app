<?php

class User {
  public int $id;

  public ?string $name;

  public function __construct(int $id, ?string $name = null) {
    $this->id = $id;
    $this->name = $name;
  }

  public function setName(string $name) {
    $this->name = $name;
  }

  public function __serialize(): array {
    return [
      'id' => $this->id,
      'name' => $this->name ?? 'Unknown',
    ];
  }
}
