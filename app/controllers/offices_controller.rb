class OfficesController < ApplicationController

  def create
    company = Company.find(params[:company_id])
    office_params = params[:office]
    params = office_params.merge({ company: company })

    form = CompanyForm::NewOfficeRow.new(params)

    if form.submit
      render json: { new_office: form.new_office }
    else 
      render json: { errors: form.errors }
    end
  end

  def update

  end

end