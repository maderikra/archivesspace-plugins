ArchivesSpace::Application.routes.draw do

  match('/plugins/generate_accession_identifier/generate' => 'generate_accession_identifiers#generate',
        :via => [:post])


  match('/plugins/generate_accession_identifier/generate2' => 'generate_accession_identifiers#generate2',
        :via => [:post])


end
