package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class FactureItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FactureItem.class);
        FactureItem factureItem1 = new FactureItem();
        factureItem1.setId(1L);
        FactureItem factureItem2 = new FactureItem();
        factureItem2.setId(factureItem1.getId());
        assertThat(factureItem1).isEqualTo(factureItem2);
        factureItem2.setId(2L);
        assertThat(factureItem1).isNotEqualTo(factureItem2);
        factureItem1.setId(null);
        assertThat(factureItem1).isNotEqualTo(factureItem2);
    }
}
