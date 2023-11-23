{"version":3,"sources":["batch_conversion.js"],"names":["BX","namespace","Crm","BatchConversionManager","this","_id","_settings","_gridId","_config","_entityIds","_enableUserFieldCheck","_enableConfigCheck","_filter","_serviceUrl","_containerId","_errors","_progress","_hasLayout","_succeededItemCount","_failedItemCount","_isRunning","_messages","_progressChangeHandler","delegate","onProgress","_documentUnloadHandler","onDocumentUnload","prototype","initialize","id","settings","type","isNotEmptyString","Math","random","toString","substring","prop","getString","getObject","getArray","AutorunProcessManager","create","serviceUrl","actionName","container","enableCancellation","title","getMessage","stateTemplate","enableLayout","getId","getConfig","setConfig","config","isPlainObject","getEntityIds","setEntityIds","entityIds","isArray","getFilter","setFilter","filter","isUserFieldCheckEnabled","enableUserFieldCheck","isConfigCheckEnabled","enableConfigCheck","name","messages","layout","clearLayout","getState","getProcessedItemCount","getTotalItemCount","execute","params","GRID_ID","CONFIG","ENABLE_CONFIG_CHECK","ENABLE_USER_FIELD_CHECK","data","ACTION","PARAMS","sessid","bitrix_sessid","ajax","url","method","dataType","onsuccess","onPrepare","result","status","hasOwnProperty","Type","CrmLeadConverter","Object","assign","errors","dlg","NotificationDialog","content","join","open","syncEditor","getCurrent","createSynchronizationEditor","addClosingListener","onSynchronizationEditorClose","show","run","setParams","addCustomEvent","bind","window","stop","onStop","reset","setTimeout","onCustomEvent","removeCustomEvent","unbind","getClass","Main","gridManager","reload","getSucceededItemCount","getFailedItemCount","getErrors","e","returnValue","sender","args","getBoolean","state","AutoRunProcessState","stopped","length","concat","completed","ProcessSummaryPanel","succeededCount","failedCount","numberSubstitution","items","getItem","get","self"],"mappings":"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","file":"batch_conversion.map.js"}