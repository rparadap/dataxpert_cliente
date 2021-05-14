/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://am2e7mogq0.execute-api.us-east-1.amazonaws.com/DAT';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.categoriasAddItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasAddItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasAddItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasAddItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasAddItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasAddItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasDisableItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasDisableItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasDisableItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasDisableItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasDisableItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasDisableItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasEditItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasEditItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasEditItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasEditItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasEditItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasEditItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasGetAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasGetAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasGetAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.categoriasGetAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var categoriasGetAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/categorias/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(categoriasGetAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetAddFilePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetAddFilePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/add-file').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetAddFilePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetAddFileOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetAddFileOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/add-file').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetAddFileOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetAddItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetAddItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetAddItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetAddItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetAddItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetAddItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetDeleteItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetDeleteItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/delete-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetDeleteItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetDeleteItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetDeleteItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/delete-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetDeleteItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetDisableItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetDisableItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetDisableItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetDisableItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetDisableItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetDisableItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetEditItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetEditItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetEditItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetEditItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetEditItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetEditItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetGetAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetGetAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetGetAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetGetAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetGetAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetGetAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetGetItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetGetItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/get-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetGetItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.datasetGetItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var datasetGetItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataset/get-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(datasetGetItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosAddItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosAddItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosAddItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosAddItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosAddItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosAddItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosDisableItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosDisableItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosDisableItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosDisableItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosDisableItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosDisableItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosEditItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosEditItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosEditItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosEditItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosEditItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosEditItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosGetAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosGetAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosGetAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosGetAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosGetAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosGetAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosGetItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosGetItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/get-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosGetItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.infograficosGetItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var infograficosGetItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/infograficos/get-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(infograficosGetItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.s3SignedUrlPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var s3SignedUrlPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/s3-signed-url').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(s3SignedUrlPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.s3SignedUrlOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var s3SignedUrlOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3-signed-url').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(s3SignedUrlOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.s3GetSignedDownloadUrlPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var s3GetSignedDownloadUrlPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/get-signed-download-url').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(s3GetSignedDownloadUrlPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.s3GetSignedDownloadUrlOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var s3GetSignedDownloadUrlOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/get-signed-download-url').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(s3GetSignedDownloadUrlOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.s3GetSignedUploadUrlPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var s3GetSignedUploadUrlPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/get-signed-upload-url').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(s3GetSignedUploadUrlPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.s3GetSignedUploadUrlOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var s3GetSignedUploadUrlOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/get-signed-upload-url').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(s3GetSignedUploadUrlOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosAddItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosAddItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosAddItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosAddItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosAddItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/add-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosAddItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosDisableItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosDisableItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosDisableItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosDisableItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosDisableItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/disable-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosDisableItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosEditItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosEditItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosEditItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosEditItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosEditItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/edit-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosEditItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosGetAllPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosGetAllPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosGetAllPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosGetAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosGetAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/get-all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosGetAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosGetItemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosGetItemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/get-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosGetItemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosGetItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosGetItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/get-item').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosGetItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosRestablecerPasswPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosRestablecerPasswPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/restablecer-passw').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosRestablecerPasswPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usuariosRestablecerPasswOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usuariosRestablecerPasswOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usuarios/restablecer-passw').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usuariosRestablecerPasswOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
