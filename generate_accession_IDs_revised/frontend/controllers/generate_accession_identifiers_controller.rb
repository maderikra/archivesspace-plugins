class GenerateAccessionIdentifiersController < ApplicationController

  skip_before_filter :unauthorised_access

  def generate
    response = JSONModel::HTTP::post_form('/plugins/generate_accession_identifiers/next')

    if response.code == '200'
      render :json => ASUtils.json_parse(response.body)
    else
      render :status => 500
    end
  end




  def generate2
    response = JSONModel::HTTP::post_form('/plugins/generate_accession_identifiers/next2')

    if response.code == '200'
      render :json => ASUtils.json_parse(response.body)
    else
      render :status => 500
    end
  end

end
