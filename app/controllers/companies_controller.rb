class CompaniesController < ApplicationController

  def index
    @companies = Company.all
  end

  def show
    @company = Company.find(params[:id])
  end

  def new
    @form = NewCompanyForm.new
  end

  def create
    form = NewCompanyForm.new

    if form.submit(params[:company])
      redirect_to companies_path, notice: "Company successfully created."
    else
      @form = form
      render :new
    end
  end

  def edit
    @company = Company.find(params[:id])
  end

  def company_form
    company = Company.find(params[:id])
    form = EditCompanyForm.new(company)

    render json: form
  end

  def update
    company = Company.find(params[:id])
    form = EditCompanyForm.new(company)

    if form.submit(params[:company])
      render json: { company: form.company }
    else
      @form = form
      render json: { errors: form.errors }
    end   

  end

end