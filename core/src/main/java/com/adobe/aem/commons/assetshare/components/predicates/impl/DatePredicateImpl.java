/*
 * Asset Share Commons
 *
 * Copyright (C) 2017 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.adobe.aem.commons.assetshare.components.predicates.impl;

import com.adobe.aem.commons.assetshare.components.predicates.AbstractPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.DatePredicate;
import com.adobe.aem.commons.assetshare.components.predicates.impl.options.SelectedOptionItem;
import com.adobe.cq.commerce.common.ValueMapDecorator;
import com.adobe.cq.wcm.core.components.models.form.OptionItem;
import com.adobe.cq.wcm.core.components.models.form.Options;
import com.day.cq.search.eval.DateRangePredicateEvaluator;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {DatePredicate.class},
        resourceType = {DatePredicateImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class DatePredicateImpl extends AbstractPredicate implements DatePredicate {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/date-range";

    @Self
    @Required
    private SlingHttpServletRequest request;

    @Self
    @Required
    private Options coreOptions;

    @ValueMapValue
    private String property;

    @ValueMapValue
    private String dateType;

    @ValueMapValue(name = PropertyPredicateImpl.PN_TYPE)
    private String typeString;

    private ValueMap valuesFromRequest = null;

    @PostConstruct
    protected void init() {
        coreOptions = request.adaptTo(Options.class);
        initPredicate(request, coreOptions);
    }

    public String getProperty() {
        return property;
    }

    public String getDateType() {
        return dateType;
    }

    public String getSubType() {
        //support variation of Checkboxes
        return typeString;
    }

    @Override
    public List<OptionItem> getItems() {
        final ValueMap initialValues = getInitialValues();
        final List<OptionItem> processedOptionItems = new ArrayList<>();

        for (final OptionItem optionItem : coreOptions.getItems()) {
            if (PredicateUtil.isOptionInInitialValues(getGroup(), optionItem, initialValues)) {
                processedOptionItems.add(new SelectedOptionItem(optionItem));
            } else {
                processedOptionItems.add((optionItem));
            }
        }
        return processedOptionItems;
    }


    @Override
    public String getName() {
        return getDateType();
    }

    @Override
    public String getLowerBoundName() {
        return getName() + "." + DateRangePredicateEvaluator.LOWER_BOUND;
    }

    @Override
    public String getUpperBoundName() {
        return getName() + "." + DateRangePredicateEvaluator.UPPER_BOUND;
    }

    @Override
    public String getInitialLowerBound() {
        return PredicateUtil.getParamFromQueryParams(request,
                getGroup() + "." + getLowerBoundName());
    }

    @Override
    public String getInitialUpperBound() {
        return PredicateUtil.getParamFromQueryParams(request,
                getGroup() + "." + getUpperBoundName());
    }

    @Override
    public boolean isReady() {
        return ("relativedaterange".equals(dateType) && getItems().size() > 0) || "daterange".equals(dateType);
    }

    @Override
    public String getInitialValue() {
        return null;
    }

    @Override
    public ValueMap getInitialValues() {
        if (valuesFromRequest == null) {
            valuesFromRequest = new ValueMapDecorator(new HashMap<>());

            if (StringUtils.isNotBlank(getInitialLowerBound())) {
                valuesFromRequest.put(getLowerBoundName(), getInitialLowerBound());
            }

            if (StringUtils.isNotBlank(getInitialLowerBound())) {
                valuesFromRequest.put(getUpperBoundName(), getInitialLowerBound());
            }
        }

        return valuesFromRequest;
    }
}