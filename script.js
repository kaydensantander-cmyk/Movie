const apiKey = "d7c1df08"
const baseURL = "https://www.omdbapi.com/"
const searchByTitle = "Star Wars"
const searchByType = "movie"
const searchByYear = "2009"

const url = `${baseURL}?s=${searchByTitle}&apikey=${apiKey}`

$.get({
url: url,
success: function(data){
    
    results = data.Search
    
    
    for (var i =0; i< results.length; i++){
       $("#brief-view > table > tbody").append("<tr>"+ 
                                                "<td>"+
                                                  "<img src = '"+results[i].Poster+"' title ='"+results[i].Poster+"'></img>"+
                                                "</td>"+ 
                                                "<td>"+results[i].Title+"</td>"+  
                                                "<td>"+results[i].Year+"</td>"+  
                                              "</tr>")
        detail = []
        var count = 0
        url2 = `${baseURL}?i=${results[i].imdbID}&apikey=${apiKey}`
        $.get({
            url: url2,
            success: function(data){ 
              console.log(data)
              detail.push(data)
              count++;

              if (count == results.length){
                
                for (var i = 0; i< detail.length; i++){
                  $("#detailed-view").append(
                    "<a class='btn btn-primary' data-toggle='collapse' href='#"+detail[i].imdbID+"'><img src='"+detail[i].Poster+"'></img></a>"
                  )
                }

                for (var i = 0; i< detail.length; i++){
                  $("#reception > table > tbody").append(
                    "<tr>"+ 
                      "<td><img src = '"+detail[i].Poster+"' title ='"+detail[i].Poster+"'></img> </td>"+ 
                      "<td>"+detail[i]["Ratings"][0].Value+"</td>"+  
                      "<td>"+detail[i]["Ratings"][1].Value+"</td>"+  
                      "<td>"+detail[i]["Ratings"][2].Value+"</td>"+  
                      "<td>"+detail[i].Awards+"</td>"+  
                    "</tr>"       
                     
                  )

                  $("#detailed-view").append(
                   "<div class='collapse' id='"+detail[i].imdbID+"'><div class='card card-body'>"+
                      "<h4>"+detail[i].Title+" <span class='badge badge-dark'>"+detail[i].Rated+"</span> <span class='badge badge-secondary'>"+detail[i].Runtime+"</span></h4>"+
                      "<div class='container'><div class='row'>"+"<div class='col-lg-3 col-md-5 col-sm-6'> <img src='"+detail[i].Poster+"'title='"+detail[i].Title+"'></img></div>"+
                      "<div class='col-lg-9 col-md-7col-sm-6'>"+
                      "<p><b>Released:</b>"+detail[i].Released+"</p>"+
                      "<p><b>Directed By: </b>"+detail[i].Director+"</p>"+
                      "<p><b>Starring: </b>"+detail[i].Actors+"</p>"+
                      "<p><b>Summary: </b>"+detail[i].Plot+"</p>"+
                      "<p><b>IMDb link: </b><a href='https://www.imdb.com/title/"+detail[i].imdbID+"'>imdb.com/title/"+detail[i].imdbID+"</a></p>"+
                      "</div></div></div></div></div>"
                  )
                }/* End of inner for loop */

                $("#detailed-view > a").click(function (){
                  $(".collapse").collapse("hide")
                })

              }/* End of if */


            }/* End of inner success */

        }) /* End of get URL2   */
          
     }// End of For Loop
  }// End of Success
}); /* End of Get */