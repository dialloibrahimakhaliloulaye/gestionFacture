package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A FactureItem.
 */
@Entity
@Table(name = "facture_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FactureItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private Double quantite;

    @Column(name = "total")
    private Double total;

    @ManyToOne
    @JsonIgnoreProperties(value = "factureItems", allowSetters = true)
    private Article article;

    @ManyToOne
    @JsonIgnoreProperties(value = "factureItems", allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantite() {
        return quantite;
    }

    public FactureItem quantite(Double quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getTotal() {
        return total;
    }

    public FactureItem total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Article getArticle() {
        return article;
    }

    public FactureItem article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Client getClient() {
        return client;
    }

    public FactureItem client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FactureItem)) {
            return false;
        }
        return id != null && id.equals(((FactureItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FactureItem{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", total=" + getTotal() +
            "}";
    }
}
