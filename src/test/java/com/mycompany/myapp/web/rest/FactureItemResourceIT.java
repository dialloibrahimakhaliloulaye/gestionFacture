package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.GestionFactureApp;
import com.mycompany.myapp.domain.FactureItem;
import com.mycompany.myapp.repository.FactureItemRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FactureItemResource} REST controller.
 */
@SpringBootTest(classes = GestionFactureApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FactureItemResourceIT {

    private static final Double DEFAULT_QUANTITE = 1D;
    private static final Double UPDATED_QUANTITE = 2D;

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;

    @Autowired
    private FactureItemRepository factureItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFactureItemMockMvc;

    private FactureItem factureItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FactureItem createEntity(EntityManager em) {
        FactureItem factureItem = new FactureItem()
            .quantite(DEFAULT_QUANTITE)
            .total(DEFAULT_TOTAL);
        return factureItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FactureItem createUpdatedEntity(EntityManager em) {
        FactureItem factureItem = new FactureItem()
            .quantite(UPDATED_QUANTITE)
            .total(UPDATED_TOTAL);
        return factureItem;
    }

    @BeforeEach
    public void initTest() {
        factureItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createFactureItem() throws Exception {
        int databaseSizeBeforeCreate = factureItemRepository.findAll().size();
        // Create the FactureItem
        restFactureItemMockMvc.perform(post("/api/facture-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factureItem)))
            .andExpect(status().isCreated());

        // Validate the FactureItem in the database
        List<FactureItem> factureItemList = factureItemRepository.findAll();
        assertThat(factureItemList).hasSize(databaseSizeBeforeCreate + 1);
        FactureItem testFactureItem = factureItemList.get(factureItemList.size() - 1);
        assertThat(testFactureItem.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testFactureItem.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createFactureItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = factureItemRepository.findAll().size();

        // Create the FactureItem with an existing ID
        factureItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFactureItemMockMvc.perform(post("/api/facture-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factureItem)))
            .andExpect(status().isBadRequest());

        // Validate the FactureItem in the database
        List<FactureItem> factureItemList = factureItemRepository.findAll();
        assertThat(factureItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = factureItemRepository.findAll().size();
        // set the field null
        factureItem.setQuantite(null);

        // Create the FactureItem, which fails.


        restFactureItemMockMvc.perform(post("/api/facture-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factureItem)))
            .andExpect(status().isBadRequest());

        List<FactureItem> factureItemList = factureItemRepository.findAll();
        assertThat(factureItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFactureItems() throws Exception {
        // Initialize the database
        factureItemRepository.saveAndFlush(factureItem);

        // Get all the factureItemList
        restFactureItemMockMvc.perform(get("/api/facture-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(factureItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE.doubleValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getFactureItem() throws Exception {
        // Initialize the database
        factureItemRepository.saveAndFlush(factureItem);

        // Get the factureItem
        restFactureItemMockMvc.perform(get("/api/facture-items/{id}", factureItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(factureItem.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE.doubleValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFactureItem() throws Exception {
        // Get the factureItem
        restFactureItemMockMvc.perform(get("/api/facture-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFactureItem() throws Exception {
        // Initialize the database
        factureItemRepository.saveAndFlush(factureItem);

        int databaseSizeBeforeUpdate = factureItemRepository.findAll().size();

        // Update the factureItem
        FactureItem updatedFactureItem = factureItemRepository.findById(factureItem.getId()).get();
        // Disconnect from session so that the updates on updatedFactureItem are not directly saved in db
        em.detach(updatedFactureItem);
        updatedFactureItem
            .quantite(UPDATED_QUANTITE)
            .total(UPDATED_TOTAL);

        restFactureItemMockMvc.perform(put("/api/facture-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFactureItem)))
            .andExpect(status().isOk());

        // Validate the FactureItem in the database
        List<FactureItem> factureItemList = factureItemRepository.findAll();
        assertThat(factureItemList).hasSize(databaseSizeBeforeUpdate);
        FactureItem testFactureItem = factureItemList.get(factureItemList.size() - 1);
        assertThat(testFactureItem.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testFactureItem.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingFactureItem() throws Exception {
        int databaseSizeBeforeUpdate = factureItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFactureItemMockMvc.perform(put("/api/facture-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factureItem)))
            .andExpect(status().isBadRequest());

        // Validate the FactureItem in the database
        List<FactureItem> factureItemList = factureItemRepository.findAll();
        assertThat(factureItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFactureItem() throws Exception {
        // Initialize the database
        factureItemRepository.saveAndFlush(factureItem);

        int databaseSizeBeforeDelete = factureItemRepository.findAll().size();

        // Delete the factureItem
        restFactureItemMockMvc.perform(delete("/api/facture-items/{id}", factureItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FactureItem> factureItemList = factureItemRepository.findAll();
        assertThat(factureItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
