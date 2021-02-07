package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.FactureItem;
import com.mycompany.myapp.repository.FactureItemRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.FactureItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FactureItemResource {

    private final Logger log = LoggerFactory.getLogger(FactureItemResource.class);

    private static final String ENTITY_NAME = "factureItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FactureItemRepository factureItemRepository;

    public FactureItemResource(FactureItemRepository factureItemRepository) {
        this.factureItemRepository = factureItemRepository;
    }

    /**
     * {@code POST  /facture-items} : Create a new factureItem.
     *
     * @param factureItem the factureItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new factureItem, or with status {@code 400 (Bad Request)} if the factureItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facture-items")
    public ResponseEntity<FactureItem> createFactureItem(@Valid @RequestBody FactureItem factureItem) throws URISyntaxException {
        log.debug("REST request to save FactureItem : {}", factureItem);
        if (factureItem.getId() != null) {
            throw new BadRequestAlertException("A new factureItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FactureItem result = factureItemRepository.save(factureItem);
        return ResponseEntity.created(new URI("/api/facture-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facture-items} : Updates an existing factureItem.
     *
     * @param factureItem the factureItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated factureItem,
     * or with status {@code 400 (Bad Request)} if the factureItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the factureItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facture-items")
    public ResponseEntity<FactureItem> updateFactureItem(@Valid @RequestBody FactureItem factureItem) throws URISyntaxException {
        log.debug("REST request to update FactureItem : {}", factureItem);
        if (factureItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FactureItem result = factureItemRepository.save(factureItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, factureItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facture-items} : get all the factureItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of factureItems in body.
     */
    @GetMapping("/facture-items")
    public ResponseEntity<List<FactureItem>> getAllFactureItems(Pageable pageable) {
        log.debug("REST request to get a page of FactureItems");
        Page<FactureItem> page = factureItemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /facture-items/:id} : get the "id" factureItem.
     *
     * @param id the id of the factureItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the factureItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facture-items/{id}")
    public ResponseEntity<FactureItem> getFactureItem(@PathVariable Long id) {
        log.debug("REST request to get FactureItem : {}", id);
        Optional<FactureItem> factureItem = factureItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(factureItem);
    }

    /**
     * {@code DELETE  /facture-items/:id} : delete the "id" factureItem.
     *
     * @param id the id of the factureItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facture-items/{id}")
    public ResponseEntity<Void> deleteFactureItem(@PathVariable Long id) {
        log.debug("REST request to delete FactureItem : {}", id);
        factureItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
