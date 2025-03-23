package com.milkepadho.MilkePadho.services;

import com.milkepadho.MilkePadho.entities.Doubt;
import com.milkepadho.MilkePadho.repositories.DoubtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.logging.Logger;

@Service
public class DoubtService {

    private static final Logger logger = Logger.getLogger(DoubtService.class.getName());

    @Autowired
    private DoubtRepository doubtRepository;

    @Transactional
    public Doubt saveDoubt(Doubt doubt) {
        try {
            doubt.setSubject(doubt.getSubject().trim());
            doubt.setUsername(doubt.getUsername().trim());
            doubt.setQuestion(doubt.getQuestion().trim());

            Doubt savedDoubt = doubtRepository.save(doubt);
            logger.info("Doubt saved successfully: " + savedDoubt);
            return savedDoubt;
        } catch (Exception e) {
            logger.severe("Error saving doubt: " + e.getMessage());
            throw new RuntimeException("Failed to save doubt", e);
        }
    }

    public List<Doubt> getAllDoubts() {
        return doubtRepository.findAll();
    }
}
