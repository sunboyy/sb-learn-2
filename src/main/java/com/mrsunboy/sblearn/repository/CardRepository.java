package com.mrsunboy.sblearn.repository;

import com.mrsunboy.sblearn.data.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Integer> {
}
