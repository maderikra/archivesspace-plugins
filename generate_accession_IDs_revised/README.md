This is a modification of the "generate_accession_identifiers" default plugin. The default plugin creates a new identifier every time the "create accession" screen is viewed (regardless of whether the record is saved). This version only creates a new identifier in sequence if the record is saved. It also checks to see if the identifier in the saved record is the same as the one that was autogenerated, which allows you to enter retrospective accessions without messing up the sequence.