{"version":3,"sources":["scrum.dod.bundle.js"],"names":["this","BX","Tasks","exports","main_popup","main_loader","ui_dialogs_messagebox","ui_buttons","main_core_events","main_core","SidePanel","_EventEmitter","babelHelpers","inherits","_this","classCallCheck","possibleConstructorReturn","getPrototypeOf","call","setEventNamespace","sidePanelManager","Instance","contentSidePanelManager","Manager","contentSidePanels","Set","bindEvents","createClass","key","value","_this2","EventEmitter","subscribe","event","_event$getCompatData","getCompatData","_event$getCompatData2","slicedToArray","sliderEvent","sidePanel","getSlider","setCacheable","emit","_event$getCompatData3","_event$getCompatData4","_event$getCompatData5","_event$getCompatData6","has","getUrl","delete","size","resetBodyWidthHack","addEscapePressHandler","openSidePanel","id","options","applyBodyWidthHack","removeEscapePressHandler","open","add","existFrameTopSlider","Boolean","getTopSlider","frameWindow","getFrameWindow","addEventListener","handleFrameKeyDown","removeEventListener","Dom","addClass","document","body","removeClass","RequestSender","sendRequest","action","data","arguments","length","undefined","Promise","resolve","reject","ajax","runAction","then","getSettings","getList","saveList","_templateObject2","taggedTemplateLiteral","_templateObject","ScrumDod","params","groupId","parseInt","requestSender","emptyDod","skipNotifications","showList","taskId","response","settings","types","activeTypeId","isEmptyDod","setActiveTypeData","popup","createPopup","baseEvent","contentContainer","getContentContainer","typesNode","querySelector","listNode","Event","bind","typeId","renderListTo","adjustPosition","onClose","show","resolver","rejecter","skipNotificationPopups","activeTypeData","getActiveTypeData","items","getListItems","solve","isListRequired","isAllToggled","showInfoPopup","showConfirmPopup","MessageBox","message","Loc","getMessage","modal","buttons","MessageBoxButtons","OK","_this3","messageBox","Button","text","color","Color","SUCCESS","events","click","close","LINK","push","getPopupButtonText","Popup","Text","getRandom","titleBar","content","renderContent","contentPadding","contentBackground","autoHide","closeByEsc","closeIcon","overlay","Tag","render","renderOption","typeData","selected","concat","encode","name","map","join","container","clean","loader","showLoader","hide","Runtime","html","find","dodRequired","listPosition","getPosition","Loader","target","mode","offset","left","width","CheckListInstance","treeStructure","getTreeStructure","getRequestData","getDescendants","forEach","checkList","checkIsComplete","Scrum","Main","UI","Dialogs"],"mappings":"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","file":"scrum.dod.bundle.map.js"}