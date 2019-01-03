function sscrapeGoogleNew() {
  
  // Get the active spreadsheet and the active sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  var searchResults=UrlFetchApp.fetch("https://www.google.com/search?q="+encodeURIComponent("Enter Your Keyword Here")+"&num=100",{muteHttpExceptions:true});
  
  var titleExp=/<h3 class=\"r\">([\s\S]*?)<\/h3>/gi;
  var urlExpression=/<h3 class=\"r\">([\s\S]*?)\&amp\;/gi;

   
  var titleResults=searchResults.getContentText().match(titleExp);
  var urlResults=searchResults.getContentText().match(urlExpression);
 
  // Set up the spreadsheet to display the results
  var headers = [["Title", "URL", "DATE"]];
  sheet.clear();
  sheet.getRange("A1:C1").setValues(headers);
  
  // create an array to store our data to be written to the sheet 
  var output = [];
  
  //To get the actual Title
  for(var i in titleResults) {
    
      var actualTitle = titleResults[i].replace(/(^\s+)|(\s+$)/g, "").replace(/<\/?[^>]+>/gi, "");
      Logger.log(actualTitle);
      var actualURL = urlResults[i].replace('<h3 class="r"><a href="/url?q=',"").replace('&amp;',"");
      Logger.log(actualURL);
    
      // push the file details to our output array (essentially pushing a row of data)
      output.push([actualTitle, actualURL, 'date ']);
    }
  
    // write data to the sheet
    sheet.getRange(2, 1, output.length, 3).setValues(output);
}

