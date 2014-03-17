require 'time'

class ArchivesSpaceService < Sinatra::Base

  Endpoint.post('/plugins/generate_accession_identifiers/next')
    .description("Generate a new identifier based on the year and a running number")
    .params()
    .permissions([])
    .returns([200, "{'year', 'YYYY', 'number', N}"]) \
  do

    year = Time.now.strftime('%Y')
    number = Sequence1.get("GENERATE_ACCESSION_IDENTIFIER_#{year}")

    json_response(:year => year, :number => number)
  end


  Endpoint.post('/plugins/generate_accession_identifiers/next2')
    .description("Generate a new identifier based on the year and a running number")
    .params()
    .permissions([])
    .returns([200, "{'year', 'YYYY', 'number', N}"]) \
  do

    year = Time.now.strftime('%Y')
    number = Sequence2.get("GENERATE_ACCESSION_IDENTIFIER_#{year}")

    json_response(:year => year, :number => number)
  end



end
